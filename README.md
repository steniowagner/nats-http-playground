
# nats-http-playground

The purpose of this repository is understand the how the [NATS](https://nats.io/) technology works, and how we can integrate it with other applications.

This playground only focus on how NATS' javascript extension works, but you can learn more about the other languages that you can integrate NATS in their [docs](https://docs.nats.io/).



### The frontend

For this experiment, I created a simple react-web-app with [Vite](https://vitejs.dev/), and its purpose is to consume and react to streaming-events from three different sources:

- A **never-ending-streaming** that will be posting a single-type of event infinitely.
- A **multi-never-ending-streaming** that will be posting three different types of events infinitely.
- An **api** that will generate a single-event during it's processing.

### The backend

The backend-functions that will be triggering the events were built with [Nodejs](https://nodejs.org/en).
- [never-ending-streaming](https://github.com/steniowagner/nats-http-playground/blob/main/backend/src/never-ending-streaming.ts): A script that will generate and publish events of the same subject to NATS in an interval of 1 second.
- [multi-never-ending-streaming](https://github.com/steniowagner/nats-http-playground/blob/main/backend/src/multi-never-ending-streaming.ts): A script that will generate and publish three different types of events to three different subjects.
- [api](https://github.com/steniowagner/nats-http-playground/blob/main/backend/src/api.ts): a simples REST-api built with [express](https://expressjs.com/) that has a single route that will publish a single event to the same subject.

### Running

#### Starting the NATS server

First, we need to have the NATS server running. There's a [docker-compose.yaml](https://github.com/steniowagner/nats-http-playground/blob/main/docker-compose.yml) file that you can run in order to have the NATS server up and running.

    $ docker-compose up

#### Starting the Web-client

*Run the following commands from the frontend folder*

    $ npm install
    $ npm run dev

The UI is pretty simple.

![enter image description here](https://github.com/steniowagner/nats-http-playground/blob/main/resources/ui.png)

> The **Single subject** section is responsible for listening events from the **express-api** and the **never-ending-streaming** script.

> The **Multi subjects** section is responsible for listening events from the **multi-never-ending-streaming** script.

Each one of them will have a number-input that can control after how many events captured we would want to unsubscribe from the subject. This value must be greater than zero to start to be used, any value below that will not be considered, and the section will be listening for the subject continously.

Also, each one of them has a Subscribe and an Unsubscribe button, where, as the names suggests, are responsible to subscribe and unsubscribe the section to a certain event.

At the bottom of both sections, we have the list of all events captured.

#### Starting the Backend

*Run the following commands from the backend folder*

**never-ending-streaming**

To start to use the never-ending-streaming, run:

    $ npm run never-ending

**multi-never-ending-streaming**

To start to use the multi-never-ending-streaming, run:

    $ npm run multi:never-ending
  
**api**

To start to use api, run:

    $ npm run api

- Route:  /
- Method: POST
- Body: Any JSON (it'll be sent by the subject as payload)

Now, with all the components up and running, we just need to go to the UI and subscribe to the subject(s) we would like to listen to, and also make sure that we have the corresponding publisher running.

That's it! Thanks!
