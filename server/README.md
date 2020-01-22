### Backend installation:
requirements: `Java 1.8` `Apache Maven`

1. Create a file `server/src/main/resources/application.properties` and populate it with the following:
```
# replace this mock key with your own OpenWeatherMap API key
owm.api.key=REPLACE_WITH_YOUR_KEY
json.cities.path=src/main/resources/city-list.json

# PostgreSQL
rows.hard.limit=9950
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect
# this allows the schema file to create the repository, and not hibernate (which will overwrite the data that we're then going to inject from our data.sql file)
spring.jpa.hibernate.ddl-auto=none
# URL of the Postgres DB. It can be a remote DB as well.
spring.datasource.url=jdbc:postgresql://localhost:5432/weathermatch
spring.datasource.username=postgres
spring.datasource.password=postgres
# we want initialization of the database to happen on every startup
spring.datasource.initialization-mode=always
# the schema path that needs to be initialized:
spring.datasource.schema=classpath:/schema.sql
# will continue application startup in spite of any errors in data initialization
spring.datasource.continue-on-error=true
spring.jpa.properties.hibernate.jdbc.batch_size = 60
spring.jpa.properties.hibernate.order_inserts = true
spring.jpa.properties.hibernate.order_updates = true
#hibernate.jdbc.fetch_size = 400 ?

# INFO ACTUATOR ENDPOINT
info.app.name=@project.name@
info.app.description=@project.description@
info.app.version=@project.version@
info.app.encoding=@project.build.sourceEncoding@
info.app.java.version=@java.version@
# HEALTH ACTUATOR ENDPOINT
management.endpoint.health.show-details=when_authorized
management.endpoint.health.roles=ADMIN

# fix createClob() is not yet implemented, SQLFeatureNotSupportedException:
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true

```

2. Start server:
```
cd server
mvn clean install
mvn spring-boot:run
```

To access the Swagger interface:
```http://localhost:8080/swagger-ui.html```
