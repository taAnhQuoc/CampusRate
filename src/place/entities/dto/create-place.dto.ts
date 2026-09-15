export class CreatePlaceDTO {
    
    name!: string;
    description!: string;
    category!: string;
    address!: string
    services?: string[];
    status?: string;
}