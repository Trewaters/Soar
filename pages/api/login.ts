// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next'
// import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
import { generateToken } from '../../utils/jwt'
import { User } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    // Find user by email
    const user: User | null = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Check password
    // const isPasswordValid = await bcrypt.compare(password, user.password)
    // if (!isPasswordValid) {
    //   return res.status(400).json({ message: 'Invalid email or password' })
    // }

    // Generate token
    const token = generateToken(user.id)

    res.status(200).json({ token })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
