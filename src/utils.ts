export const formatDate = (date: string): string => new Date(date).toLocaleString().split(',')[0]
