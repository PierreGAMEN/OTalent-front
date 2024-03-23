export const queryTrainingFromCategory = `
query Category($categoryId: Int!) {
  category(id: $categoryId) {
    trainings {
      duration
      id
      image
      label
      organization {
        name
      }
      category {
        label
        id
      }
    }
  }
}
`;

export const queryAllTrainingCard = `
query Trainings {
    trainings {
      id
      label
      duration
      image
      organization {
        name
      }
      category {
        label
        id
      }
    }
  }`

export const queryOneOrganization = 
`query Organization($organizationId: Int!) {
  organization(id: $organizationId) {
    address
    city
    email
    id
    image
    name
    phone_number
    postal_code
    trainings {
      category {
        label
      }
      id
      label
      image
      duration
      organization {
        name
        id
      }
    }
  }
}`

export const queryAllCategories = 
`query Categories {
  categories {
    label
    id
  }
}
`
