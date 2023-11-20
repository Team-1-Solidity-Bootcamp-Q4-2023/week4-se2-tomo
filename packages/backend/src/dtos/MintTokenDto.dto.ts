import { ApiProperty } from '@nestjs/swagger';

export class MintTokenDto {
  @ApiProperty({ type: String, required: true, default: 'recipient address' })
  recipientAddress: string;
  @ApiProperty({ type: String, required: true, default: 'MTK amount' })
  amount: string;
}
