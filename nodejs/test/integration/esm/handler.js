const { stringify } = JSON

export function contextDoneHandler(event, context) {
  context.done(null, {
    body: stringify('foo'),
    statusCode: 200,
  })
}

export function contextDoneHandlerDeferred(event, context) {
  setTimeout(
    () =>
      context.done(null, {
        body: stringify('foo'),
        statusCode: 200,
      }),
    100,
  )
}

export function contextSucceedHandler(event, context) {
  context.succeed({
    body: stringify('foo'),
    statusCode: 200,
  })
}

export function contextSucceedHandlerDeferred(event, context) {
  setTimeout(
    () =>
      context.succeed({
        body: stringify('foo'),
        statusCode: 200,
      }),
    100,
  )
}

export function callbackHandler(event, context, callback) {
  callback(null, {
    body: stringify('foo'),
    statusCode: 200,
  })
}

export function callbackHandlerDeferred(event, context, callback) {
  setTimeout(
    () =>
      callback(null, {
        body: stringify('foo'),
        statusCode: 200,
      }),
    100,
  )
}

export function promiseHandler() {
  return Promise.resolve({
    body: stringify('foo'),
    statusCode: 200,
  })
}

export function promiseHandlerDeferred() {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          body: stringify('foo'),
          statusCode: 200,
        }),
      100,
    )
  })
}

export async function asyncFunctionHandler() {
  return {
    body: stringify('foo'),
    statusCode: 200,
  }
}

// we deliberately test the case where a 'callback' is defined
// in the handler, but a promise is being returned to protect from a
// potential naive implementation, e.g.
//
// const { promisify } = 'utils'
// const promisifiedHandler = handler.length === 3 ? promisify(handler) : handler
//
// if someone would return a promise, but also defines callback, without using it
// the handler would not be returning anything
export function promiseWithDefinedCallbackHandler(
  event, // eslint-disable-line no-unused-vars
  context, // eslint-disable-line no-unused-vars
  callback, // eslint-disable-line no-unused-vars
) {
  return Promise.resolve({
    body: stringify('Hello Promise!'),
    statusCode: 200,
  })
}

export function contextSucceedWithContextDoneHandler(event, context) {
  context.succeed({
    body: stringify('Hello Context.succeed!'),
    statusCode: 200,
  })

  context.done(null, {
    body: stringify('Hello Context.done!'),
    statusCode: 200,
  })
}

export function callbackWithContextDoneHandler(event, context, callback) {
  callback(null, {
    body: stringify('Hello Callback!'),
    statusCode: 200,
  })

  context.done(null, {
    body: stringify('Hello Context.done!'),
    statusCode: 200,
  })
}


export function callbackWithPromiseHandler(event, context, callback) {
  callback(null, {
    body: stringify('Hello Callback!'),
    statusCode: 200,
  })

  return Promise.resolve({
    body: stringify('Hello Promise!'),
    statusCode: 200,
  })
}

export function callbackInsidePromiseHandler(event, context, callback) {
  return new Promise((resolve) => {
    callback(null, {
      body: stringify('Hello Callback!'),
      statusCode: 200,
    })

    resolve({
      body: stringify('Hello Promise!'),
      statusCode: 200,
    })
  })
}

export const throwExceptionInPromiseHandler = async() => {
  throw NaN
}

export const throwExceptionInCallbackHandler = () => {
  throw NaN
}

export const NoAnswerInPromiseHandler = async() => {}

export const BadAnswerInPromiseHandler = async() => {
  return {}
}

export const BadAnswerInCallbackHandler = (event, context, callback) => {
  callback(null, {})
}
export const nested = {
  contextDoneHandler: function contextDoneHandler(event, context) {
    context.done(null, {
      body: JSON.stringify('foo'),
      statusCode: 200,
    })
  },

  contextSucceedHandler: function contextSucceedHandler(event, context) {
    context.succeed({
      body: JSON.stringify('foo'),
      statusCode: 200,
    })
  },

  callbackHandler: function callbackHandler(event, context, callback) {
    callback(null, {
      body: JSON.stringify('foo'),
      statusCode: 200,
    })
  },

  promiseHandler: function promiseHandler() {
    return Promise.resolve({
      body: JSON.stringify('foo'),
      statusCode: 200,
    })
  },

  asyncFunctionHandler: async function asyncFunctionHandler() {
    return {
      body: JSON.stringify('foo'),
      statusCode: 200,
    }
  },
}
