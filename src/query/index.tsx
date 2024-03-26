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
        id
      }
      category {
        label
        id
      } reviews {
        rating
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
        id
      }
      category {
        label
        id
      }
      reviews {
        rating
      }
    }
  }`

export const queryOneOrganization = 
`query Organization($organizationId: Int!) {
  organization(id: $organizationId) {
    address
    city
    description
    email
    name
    image
    id
    phone_number
    postal_code
    url_site
    trainings {
      id
      label
      duration
      image
      organization {
        name
        id
      }
      category {
        label
        id
      }
      reviews {
        rating
      }
    }
  }
}`

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

export const queryAllCategories = 
`query Categories {
  categories {
    label
    id
  }
}
`