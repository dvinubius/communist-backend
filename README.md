# Communist Leader Adoration Backend

We're reimagining communist Romania in modern times, when we have internet and social media.

The communist party has built a backend that tracks the moods of our beloved leader. He's a very moody leader, and likes to share his moods with his beloved people.


## Features 

The backend exposes 3 endpoints publicly:


### Current Mood
`GET https://communist-backend-ac625ad53940.herokuapp.com/api/v1/current-mood`

returns JSON of the form 

```
{
  data: {
      mood: string,         // the leader's current mood 
      adorations: number,   // the number of adorations received by the leader since he has this mood
      time: string          // ISOString representing the time at which the leader got into this mood
  }
}
```

### Mood History
`GET https://communist-backend-ac625ad53940.herokuapp.com/api/v1/mood-history` 

returns JSON of the form 

```
{
  data: Mood[]            // Mood has the shape of the data from /current-mood
}
```

### Express Adoration

`POST https://communist-backend-ac625ad53940.herokuapp.com/api/v1/adore`

Increments adoration count, associated with the leader's current mood


## Limitations

Not to ruin the story, but - under the hood, the backend just changes the mood randomly, every 30 seconds. 

We don't support setting the current mood.

We're not concerned with authentication, associating adoration with a particular user etc.



# Assignments

## STEP 1

The task is to create a React front end for the adoration of the leader.

Use js or ts.

The front end has 1 route. 

The page on that route displays 
- the leader's current mood
- the leader's current mood adoration count
- the historical total adoration count

The page also has an "Adore" button.

0. Start the communist-backend locally - `npm install` , `npm start`
1. To create a new react app, use `npx create-react-app`. If you prefer typescript, use `npx create-react-app --template typescript`.
2. Create components as you see fit
3. Style the UI as you see fit
4. Upon successful adoration, display a success message to the user. Upon failed adoration (simulate this by stopping the backend), display an error message in the UI
5. Take inspiration from the `react-basics` repo, if you need to. Use the `hooks` branch, where we have the `FetchUsers` component.

## STEP 2
 
In STEP 1 we've built a front end which doesn't update in time. 

The task is to add some logic that keeps your displayed info up-to-date. 

Suppose the backend tracks real mood swings of your leader. You know that, historically, the leader has proven to change his mood as frequently as once every 30 seconds, but not more frequently than that. 

In terms of adoration count, the hard requirement is to have it updating every 5 seconds.

Work with the `useEffect` hook and use `setInterval()` according to your needs. As a reminder: the `useEffect` hook, if used with an empty array as the 2nd argument, runs exactly **once** after the component was mounted.

### For optimal behaviour
In order to avoid a memory leak resulting from uncleared intervals, make use of the cleanup pattern provided by the `useEffect` hook:

```
useEffect(() => {
  // my custom code to run when the component is mounted

  return () => {
    // my custom code to run when the component is destroyed (like ngOnDestroy() in Angular)
    // this is the place where intervals created in this useEffect should be cleared
  }
}, [])
```

## STEP 3

The task is to spice up you UI with linear gradient borders.

The vanilla implementation: https://codepen.io/chriscoyier/pen/PXNPRq

Create a dedicated component called `<GradientBorder>`. It should be used like:

```
<GradientBorder>
  <p>Hello</p>
<GradientBorder />
```

in order to give the paragraph a gradient border.

As a reminder: internally, the `<GradientBorder>` can access its children via `props.children`.

Use the gradient wherever you see fit. 
For the gradient, use any colorscheme that seems to suit the use case (moody leader adoration).


## STEP 4 (challenge)

Display a histogram of the leader's moods, as they occur in the history. 

(Moods on the x Axis, number of occurences on the y Axis.)

The goal is to get a sense of how frequent each mood is.

Use [React Google Charts](https://www.react-google-charts.com/examples/histogram) or any library you prefer.

Use dedicated components as you see fit. The histogram should appear on the same page as all the other stuff (let it scroll vertically on overflow)

Update the histogram every 30 seconds, just like you update the display of the current mood.