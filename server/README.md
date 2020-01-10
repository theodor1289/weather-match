# How to run the backend server (default port 8080)

requirements: `Java 1.8` `Apache Maven`

## Before anything:
Create a file `server/src/main/resources/application.properties` and populate it with the following:
```
# replace this mock key with your own OpenWeatherMap API key
owm.api.key=REPLACE_WITH_YOUR_OWN_KEY
# this allows the schema file to create the repository, and not hibernate (which will overwrite the data that we're then going to inject from our data.SQL)
spring.jpa.hibernate.ddl-auto=none
# INFO ACTUATOR ENDPOINT
info.app.name=@project.name@
info.app.description=@project.description@
info.app.version=@project.version@
info.app.encoding=@project.build.sourceEncoding@
info.app.java.version=@java.version@
# HEALTH ACTUATOR ENDPOINT
management.endpoint.health.show-details=when_authorized
management.endpoint.health.roles=ADMIN
```

## Build: 

#### You must be in [wellness-rest](./wellness-rest)

#### Perform install

##### Unix (linux or mac):
```
./mvn clean install
```

##### Windows (command line, or powershell):
```
mvn clean install
```

## Run:

Unix:
```
./mvn spring-boot:run
```

Windows:
```
mvn spring-boot:run
```

You could also do this, but it will most probably run out of heap memory as it's bundling the 
trained Standford Sentiment Model in the jar:
```
java -jar target/wellness-rest-0.0.1-SNAPSHOT.jar 
```

## API:

### Run the server and check the Swagger v2 Open API Specification:
```
http://localhost:8080/swagger-ui.html
```

### More examples at:

[requests.http](https://github.com/theodor1289/stress-less/blob/master/wellness-rest/requests.http)
