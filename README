# Job Scheduling Service

### Books
* Exposed Endpoints:

  * [GET] /api/v1/jobs?paging[page]=1&paging[per_page]=20
  <code>**description**: Get All jobs paginated</code>

  * [GET] /api/v1/jobs/[jobId]
  <code>**description**: Get single job by id</code>

  * [DELETE] /api/v1/jobs/[jobId]
  <code>**description**: Delete single job by id</code>

  * [POST] /api/v1/jobs/[jobId]
  <code>**description**:  Create a single Job</code>
   **body**
    ```json
      {
                "name": "string",
                "job_type_id": 1 | 2,
                "interval_minutes": 0,
                "is_recurring": true,
                "extra_attributes": {}
      }
    ```



### Job History

* Exposed Endpoints
  * [GET] /api/v1/job-history/[jobId]
  <code>**description**: View history runs for a specific job</code>



### How to run locally
```yaml
> create a .env file using .env.example as reference.
> create a database locally on your machine with same name as provided in .env file (postgres).
> npm install
> npm run db:migrate:up
> npm run db:seed
> npm run start
```

### How to run using docker
```yaml
> create a .env file using .env.example as reference.
> docker compose up
```
#### [Open Api Swagger Docs](localhost:3000/docs)
#### Open Api Swagger Docs : localhost:3000/docs

