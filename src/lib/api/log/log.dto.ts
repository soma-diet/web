export interface LogEntryRequestDto {
    id: string,
    timestamp: string, // iso 8601 string (yyyy-MM-dd'T'HH:mm:ss)
    itemId: string,
    servingId?: string | null,
    quantity: number,
    parentEntryId?: string | null, // nested elementy (napr. recipe)
}