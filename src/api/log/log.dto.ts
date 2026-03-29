import type { LogEntry } from "@/model";
import { makeLocalDateFormat } from "@/utils/date.util";

export class LogEntryRequestDto {
  id: string;
  timestamp: string;
  itemId: string;
  servingId: string | null;
  quantity: number;
  parentEntryId: any; // for the future

  constructor(
    id: string,
    itemId: string,
    servingId: string | null,
    quantity: number,
    date: Date,
  ) {
    this.id = id;
    this.timestamp = makeLocalDateFormat(date);
    this.itemId = itemId;
    this.servingId = servingId;
    this.quantity = quantity;
    this.parentEntryId = null;
  }

  static createRequest(
    itemId: string,
    servingId: string | null,
    quantity: number,
    date: Date,
  ): LogEntryRequestDto {
    return new LogEntryRequestDto(
      crypto.randomUUID(),
      itemId,
      servingId,
      quantity,
      date,
    );
  }

  static updateRequest(
    entry: LogEntry,
    servingId: string | null,
    quantity: number,
    date: Date,
  ): LogEntryRequestDto {
    return new LogEntryRequestDto(
      entry.id,
      entry.item.id,
      servingId,
      quantity,
      date,
    );
  }
}
