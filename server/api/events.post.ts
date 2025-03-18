import { PrismaClient } from '@prisma/client'
import { H3Event, H3Error, readMultipartFormData } from 'h3'
import { uploadImage } from '../utils/cloudinary'

const prisma = new PrismaClient()

interface EventFormData {
  title: string
  type: string
  date: string
  time: string
  venue: string
  address: string
  description: string
  price: number
  image?: Blob
}

type MultipartData = {
  name: string
  data: Buffer
  filename?: string
  type?: string
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: 'No form data received'
      })
    }

    // Extract data from formData
    const getData = (name: string): string => {
      const field = formData.find((f) => f.name === name && f.data)
      return field?.data.toString() || ''
    }

    // Validate required fields
    const requiredFields = ['title', 'type', 'date', 'time', 'venue', 'address', 'description', 'price'] as const
    for (const field of requiredFields) {
      const value = getData(field)
      if (!value) {
        throw createError({
          statusCode: 400,
          message: `${field} is required`
        })
      }
    }

    // Get image file if it exists
    let imageUrl: string | undefined
    const imageFile = formData.find((f) => f.name === 'image' && f.data)
    if (imageFile?.data) {
      try {
        imageUrl = await uploadImage(imageFile.data)
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        throw createError({
          statusCode: 500,
          message: 'Failed to upload image'
        })
      }
    }

    // Create event in database
    const newEvent = await prisma.event.create({
      data: {
        title: getData('title'),
        type: getData('type'),
        date: new Date(`${getData('date')}T${getData('time')}`),
        venue: getData('venue'),
        address: getData('address'),
        description: getData('description'),
        price: parseFloat(getData('price')),
        imageUrl
      }
    }).catch((dbError) => {
      console.error('Error creating event:', dbError)
      throw createError({
        statusCode: 500,
        message: 'Failed to create event in database'
      })
    })

    // Return success response
    setResponseStatus(event, 201)
    return { success: true, data: newEvent }
  } catch (error: unknown) {
    console.error('Error processing request:', error)
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error'
    })
  }
}) 