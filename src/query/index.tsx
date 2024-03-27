export const queryTrainingFromCategory = `
query Category($categoryId: ID!) {
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
`query Organization($organizationId: ID!) {
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
`query Training($trainingId: ID!) {
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

export const queryOneMember = `
  query Member($memberId: ID!) {
    member(id: $memberId) {
      avatar
      categories {
        id
        label
      }
      city
      email
      firstname
      id
      lastname
      password
      postal_code
      reviews {
        comment
        id
        rating
        training {
          label
          id
        }
      }
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
  }
`;

export const queryFavoritesCategories = 
`query Member($memberId: ID!) {
  member(id: $memberId) {
    categories {
      label
      id
    }
  }
}`
