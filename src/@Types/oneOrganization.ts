export default interface OneorganizationI {
    address: string;
    city: string;
    description: string;
    email: string;
    name: string;
    image: string;
    id: number;
    phone_number: string;
    postal_code: string;
    url_site: string;
    trainings: {
        id: number;
        image: string;
        label: string;
        price: number;
        category: {
            label: string;
            id: string;
        };
    }[];
}