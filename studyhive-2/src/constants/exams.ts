export const EXAMS = [
  {
    id: 'JEE',
    name: 'JEE Advanced',
    color: '#0EA5E9',
    subjects: ['Physics', 'Chemistry', 'Maths'],
    totalMarks: 360,
    duration: 180,
  },
  {
    id: 'NEET',
    name: 'NEET UG',
    color: '#22C55E',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    totalMarks: 720,
    duration: 180,
  },
  {
    id: 'UPSC',
    name: 'UPSC CSE',
    color: '#F59E0B',
    subjects: ['GS1', 'GS2', 'GS3', 'GS4', 'Optional'],
    totalMarks: 1750,
    duration: 180,
  },
  {
    id: 'CAT',
    name: 'CAT',
    color: '#8B5CF6',
    subjects: ['VARC', 'DILR', 'QA'],
    totalMarks: 228,
    duration: 120,
  },
] as const

export const getExamById = (id: string) => {
  return EXAMS.find(e => e.id === id)
}
