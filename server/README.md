# How to run the backend server (default port 8080)

requirements: `Java 1.8` `Apache Maven`

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
