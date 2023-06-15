export const REFRESH_TOKEN = `query refresh_token(
  $refresh_token: String!
  ) {
    refresh_token(
      refresh_token_input: { refresh_token: $refresh_token}
      ) {
        token
        refresh_token
      }
  }`;