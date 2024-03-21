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