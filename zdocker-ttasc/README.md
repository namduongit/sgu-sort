## Deployment
### Docker
##### Requirements
- GNU make
- Docker (docker-compose)

##### How to
- Clone this project:
  ```
  git clone https://github.com/namduongit/sgu-sort.git
  ```
- Run forground: `make docker`
- Run background: `make up`. Then backend service will be running on port *5000* and frontend service will be running on port *3000*
- Stop background: `make down`