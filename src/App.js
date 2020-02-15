import React from 'react';
import './App.scss';
import Calender from './component/Calender';
// import { Machine, assign } from 'xstate';
// import { useMachine } from '@xstate/react';
// import Calender from './component/calender';

// async function swapiFetcher(context) {
//   const { name } = context;
//   const response = await fetch(`https://swapi.co/api/people/?search=${name}`);
//   const json = await response.json();
//   const results = json.results;
//   console.log('RESULTS', results);
//   return results;
// }

// const inputMachine = Machine({
//   id: 'input',
//   initial: 'edit',
//   context: {
//     name: '',
//     result: null,
//   },
//   states: {
//     edit: {
//       on: {
//         SUBMIT: {
//           target: 'submit',
//         },
//       },
//     },
//     submit: {
//       initial: 'loading',
//       states: {
//         loading: {
//           id: 'fetch-data',
//           invoke: {
//             src: swapiFetcher,
//             onDone: {
//               target: 'loaded',
//               actions: assign((context, event) => {
//                 console.log('CONTEXT', context);
//                 console.log('EVENT', event);
//                 return {
//                   result: event.data,
//                 };
//               }),
//             },
//             onError: {
//               target: 'failed',
//             },
//           },
//         },
//         loaded: {
//           on: {
//             REFRESH: {
//               target: 'loading',
//             },
//           },
//         },
//         failed: {
//           on: {
//             RETRY: {
//               target: 'loading',
//             },
//           },
//         },
//       },
//     },
//   },
//   on: {
//     INPUT: {
//       target: '.edit',
//       actions: assign((context, event) => {
//         return {
//           name: event.name,
//         };
//       }),
//     },
//   },
// });

function App() {
  // const [current, send] = useMachine(inputMachine);
  // console.log(current);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   send({ type: 'SUBMIT' });
  // }
  // return (
  // <div className="App">
  //   <header className="App-header">
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         onChange={(e) => send({ type: 'INPUT', name: e.target.value })}
  //       />
  //       <button type="submit">submit</button>
  //     </form>
  //   </header>
  // </div>
  // );

  return (
    <div className="root">
      <Calender />
    </div>
  );
}

export default App;
