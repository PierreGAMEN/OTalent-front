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

export const queryOneTraining = 
`query Training($trainingId: Int!) {
  training(id: $trainingId) {
    averageRating
    category {
      label
      id
    }
    description
    dates
    duration
    excerpt
    id
    image
    label
    prerequisites
    price
    program
    organization {
      image
      name
      id
      url_site
      email
    }
    reviews {
      comment
      id
      member {
        id
        firstname
        lastname
        avatar
      }
      rating
    }
  }
}`