// pages/api/user/[id].ts

import { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '../../../middleware/auth'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const user = await prisma.user.findUnique({ where: { id: String(id) } })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(user)
}

export default authMiddleware(handler)
