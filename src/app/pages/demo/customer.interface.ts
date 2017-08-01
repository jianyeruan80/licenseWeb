export class Customer {
    name: string;
    addresses: Address[];
    memberShip:Member;

}

export class Address {
    street: string;
    postcode: string;
}
export class Member{
	card:string
	expire:Date;
}