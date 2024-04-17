export const queryTrainingFromCategory = `
query Category($categoryId: ID!) {
  category(id: $categoryId) {
    trainings {
      duration
      price
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
      price
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
  }`;

export const queryOneOrganization = `query Organization($organizationId: ID!) {
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
      price
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
}`;

export const queryOneTraining = `query Training($trainingId: ID!) {
  training(id: $trainingId) {
    averageRating
    category {
      label
      id
    }
    description
    dates
    duration
    price
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
      created_at
      member {
        id
        firstname
        lastname
        avatar
      }
      rating
    }
  }
}`;

export const queryAllCategories = `query Categories {
  categories {
    label
    id
  }
}
`;

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
        created_at
        training {
          label
          id
        }
      }
      trainings {
        id
        label
        duration
        price
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

export const queryFavoritesCategories = `query Member($memberId: ID!) {
  member(id: $memberId) {
    categories {
      label
      id
    }
  }
}`;

export const queryNearestOrganizations = `query Member($memberId: ID!) {
  member(id: $memberId) {
    region
    nearestOrganizations {
      trainings {
        label
      }
    }
  }
}`;

export const queryDissociateMemberTraining = `mutation Mutation($memberId: ID!, $trainingId: ID!) {
  dissociateMemberTraining(memberId: $memberId, trainingId: $trainingId)
}`;

export const queryAssociateMemberTraining = `mutation Mutation($memberId: ID!, $trainingId: ID!) {
  associateMemberTraining(memberId: $memberId, trainingId: $trainingId)
}`;

export const queryDissociateMemberCategory = `
mutation Mutation($memberId: ID!, $categoryId: ID!) {
  dissociateMemberCategory(memberId: $memberId, categoryId: $categoryId)
}`;

export const queryAssociateMemberCategory = `
mutation Mutation($memberId: ID!, $categoryId: ID!) {
  associateMemberCategory(memberId: $memberId, categoryId: $categoryId)
}
`

export const queryModifyReview = `mutation ModifyReview($modifyReviewId: ID!, $input: ReviewInput!) {
  modifyReview(id: $modifyReviewId, input: $input) {
    comment
  }
}`;

export const queryAddReview = `mutation AddReview($input: ReviewInput!) {
  addReview(input: $input) {
    comment
    id
    rating
    member {
      avatar
      firstname
      id
      lastname
    }
  }
}`;

export const queryLogin = `mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}`;

export const queryCategories = `query Categories {
  categories {
    id
    label
  }`;

export const queryAddOrganization = `
  mutation Mutation($input: OrganizationInput!) {
    addOrganization(input: $input) {
      name
      id
    }
  }
`;

export const queryAddMember = `
mutation Mutation($input: MemberInput!) {
  addMember(input: $input) {
    firstname
    id
    email
    lastname
  }
}
`;

export const deleteMember = `
mutation Mutation($deleteMemberId: ID!) {
  deleteMember(id: $deleteMemberId)
}
`;

export const queryUpdateMemberInformation = `mutation Mutation($modifyMemberId: ID!, $input: MemberInput!) {
  modifyMember(id: $modifyMemberId, input: $input) {
    email
    lastname
    firstname
    id
  }
}`;

export const queryDeleteOrganization = `
mutation Mutation($deleteOrganizationId: ID!) {
  deleteOrganization(id: $deleteOrganizationId)
}`

export const queryOrganizationInformation = `
query Organization($organizationId: ID!) {
  organization(id: $organizationId) {
    id
    name
    email
    description
    phone_number
    address
    city
    postal_code
    image
    url_site
    trainings {
      id
      description
      label
      price
      duration
      price
      dates
      excerpt
      prerequisites
      program
      image
      reviews {
        id
        rating
      }
      category {
        id
        label
      }
    }
  }
}`;

export const queryUpdateOrganizationInformation = `mutation Mutation($modifyOrganizationId: ID!, $input: OrganizationInput!) {
  modifyOrganization(id: $modifyOrganizationId, input: $input) {
    postal_code
    phone_number
    name
    id
    email
  }
}
`;

export const queryTrainingInformation = `
query Training($trainingId: ID!) {
  training(id: $trainingId) {
    id
    label
    description
    price
    duration
    dates
    excerpt
    prerequisites
    program
    image
    dates
    category {
      id
      label
    }
  }
}`;

export const queryUpdateTrainingInformations = `
mutation Mutation($modifyTrainingId: ID!, $input: TrainingInput!) {
  modifyTraining(id: $modifyTrainingId, input: $input) {
    id
    label
  }
}
`;

export const queryCreateTraining = `mutation AddTraining($input: TrainingInput!) {
  addTraining(input: $input) {
    label
    id
  }
}`;

export const queryDeleteTraining = `mutation Mutation($deleteTrainingId: ID!) {
  deleteTraining(id: $deleteTrainingId)
}`;

export const queryGetInformationSiret = `query Siret($siret: String!) {
  siret(siret: $siret) {
    siretFound
    name
    address
    postalCode
    city
  }



}`;

export const querySendEmailToRecoverPassword = `
mutation Mutation($input: ForgotPasswordInput!) {
  requestPasswordReset(input: $input)
}`;

export const querySendNewPassword = `
mutation Mutation($updatedPassword: String!) {
  resetPassword(updatedPassword: $updatedPassword)
}
`;

export const queryNameMember = `
query Query($memberId: ID!) {
  member(id: $memberId) {
    firstname
    lastname
    avatar
  }
}
`;

export const queryNameOrganization = `
query Query($organizationId: ID!) {
  organization(id: $organizationId) {
    name
    image
  }
}
`;

export const queryDeleteReview = `
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;

export const queryMemberInformationForHomePage = `
query Member($memberId: ID!) {
  member(id: $memberId) {
    postal_code
    categories {
      label
      id
    }
    region
    nearestOrganizations {
      trainings {
        id
        label
        price
        image
        duration
        
        category {
          label
          id
        }
        dates
        organization {
          name
          id
        }
        created_at
        reviews {
          rating
        }
      }
    }
  }
}`;

export const queryPrankTrainings = `
query Training($trainingId: ID!, $trainingId2: ID!) {
  training1: training(id: $trainingId) {
    id
    label
    price
    duration
    image
    organization {
      id
      name
    }
    category {
      id
      label
    }
    reviews {
      rating
    }
  }
  training2: training(id: $trainingId2) {
    id
    label
    price
    duration
    image
    organization {
      id
      name
    }
    category {
      id
      label
    }
    reviews {
      rating
    }
  }
}
`;

export const queryTrainingsByRegions = `query TrainingsByRegion($regionName: String!) {
  trainingsByRegion(regionName: $regionName) {
    id
    label
    price
    duration
    excerpt
    image
    reviews {
      rating
    }
    category {
      id
      label
    }
    organization {
      id
      name
    }
  }
}`;
