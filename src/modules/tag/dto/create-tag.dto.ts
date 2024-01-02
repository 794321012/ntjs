import { IsNotEmpty } from 'class-validator';
export class CreateTagDto {
  @IsNotEmpty()
  label: string;
}
