import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
// import { ApolloLink } from "apollo-link";
// import { HttpLink } from "apollo-link-http";
import { createPersistedQueryLink } from "@apollo/link-persisted-queries";
import gql from "graphql-tag";

export namespace CONTENTFUL_DAO {
  const TOKEN = process.env.CONTENT_API_ACCESS_TOKEN;
  const SPACE = process.env.CONTENT_SPACE_ID;
  const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}`;
  const link = from([
    createPersistedQueryLink(),
    new HttpLink({
      uri: URL,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }),
  ]);

  const cache = new InMemoryCache();
  const apolloClient = new ApolloClient({
    link,
    cache,
  });

  // eslint-disable-next-line import/prefer-default-export
  export class Faq {
    public static async getFAQContent() {
      const { data } = await apolloClient.query({
        query: gql`
          query GetFAQSection {
            faqPageCollection(limit: 1) {
              items {
                faqSectionsCollection {
                  items {
                    title
                    faqItemsCollection {
                      items {
                        question
                        answer {
                          json
                        }
                      }
                    }
                  }
                }
                faqCouldntAnswer {
                  title
                  body
                }
              }
            }
          }
        `,
      });
      return data;
    }
  }
}
