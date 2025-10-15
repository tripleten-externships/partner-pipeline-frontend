import { gql } from "@apollo/client";

export const GET_PROJECT_NAME = gql(`
    query Projects {
        projects {
            name
            project
            createdAt
            isActive
        }
    }
`);

export const GET_PROJECT_DATE_TIME = gql(`
    query Projects {
        projects {
            name
            project
            createdAt
            isActive
        }    
    }
`);

export const FILTER_PROJECT_ALPHA_ASC = gql(`
    query Projects {
        projects(orderBy: { name:asc }) {
            name
            project
            createdAt
            isActive
        }
    }
`);

export const FILTER_PROJECT_ALPHA_DESC = gql(`
    query Projects {
        projects(orderBy: { name:desc }) {
            name
            project
            createdAt
            isActive
        }
    }
`);

export const FILTER_PROJECT_LAST_UPDATE_ASC = gql(`
    query Projects {
        projects(orderBy: { lastUpdate:asc }) {
            name
            project
            lastUpdate
        }
    }
`);

export const FILTER_PROJECT_CREATED_ASC = gql(`
    query Projects {
        projects(orderBy: { createdAt:asc }) {
            name
            project
            createdAt
        }
    }
`);

export const FILTER_PROJECT_CREATED_DESC = gql(`
    query Projects {
        projects(orderBy: { createdAt:desc }) {
            name
            project
            createdAt
        }
    }
`);

export const FILTER_PROJECT_LAST_UPDATE_DESC = gql(`
    query Projects {
        projects(orderBy: { lastUpdate:desc }) {
            name
            project
            lastUpdate
        }
    }
`);

export const FILTER_PROJECT_IS_NOT_ACTIVE = gql(`
    query Projects {
        projects(where: 
            { isActive:  {
                equals: false
            }}, 
            orderBy: {
                lastUpdate:asc }) 
            {
            name
            project
            isActive
            membersCount
            lastUpdate
            }
        }
    }   
`);

export const FILTER_PROJECT_IS_ACTIVE = gql(`
    query Projects {
        projects(where: 
            { isActive:  {
                equals: true
            }}, 
            orderBy: {
                lastUpdate:asc }) 
            {
            name
            project
            isActive
            membersCount
            lastUpdate
            }
        }
    }   
`);

export const FILTER_PROJECT_NO_MEMBERS = gql(`
    query Projects {
        projects(where: {
            members:  {
                none:  {}
            }}, orderBy: {
                lastUpdate:asc }) 
            {
            name
            project
            lastUpdate
            }
        }
    }
`);

export const FILTER_PROJECT_WITH_MEMBERS = gql(`
    query Projects {
        projects(where: 
            {members:  {
                some:  {}
            }}, orderBy: {
                lastUpdate:asc }) 
            {
            name
            project
            membersCount
            members {
                name
                }
            lastUpdate
            }
        }
    }
`);

