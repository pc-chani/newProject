import { Lending } from './Lending.model'

export class productToGmh {
    public Name: string
    public ProductCodeToGMH: number
    public ProductCode: number
    public GmhCode: number
    // public Picture:FormData;
    public Amount: number
    public FreeDescription: string;
    public IsDisposable: boolean
    public SecurityDepositAmount: number
    public Status: string
    public Lendings: Lending[]
}