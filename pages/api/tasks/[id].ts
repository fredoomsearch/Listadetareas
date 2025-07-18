import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const task = await prisma.task.update({
      where: { id: String(id) },
      data: { completed: true }
    });
    res.status(200).json(task);
  } else if (req.method === 'DELETE') {
    await prisma.task.delete({ where: { id: String(id) } });
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
