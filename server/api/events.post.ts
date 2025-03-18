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

    // Get image file if it exists
    const imageFile = formData.find((f) => f.name === 'image' && f.data)
    let imageUrl: string | undefined

    if (imageFile?.data) {
      imageUrl = await uploadImage(imageFile.data)
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
    })

    return newEvent
  } catch (error) {
    console.error('Error creating event:', error)
    if (error instanceof H3Error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Error creating event'
    })
  }
}) 