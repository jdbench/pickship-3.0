import { useAppQuery } from "../hooks"
import { GraphQLClient, request } from "graphql-request";
import { useAuthenticatedFetch } from "../hooks";
import { useQuery } from "react-query";

export function useGQLQuery(key, query, variables, config = {}){
    const fetch = useAuthenticatedFetch();
    const endpoint = async() => await fetch("admin/api/2022-07/graphql.json");

    const fetchData = async() => await request(endpoint, query, variables);

    return useQuery(key, fetchData, config);
};