const defaultConfig = {
    title: 'adaptation_test',
    timewindow: [978289700000, 978310675000],
    datasets: [
      {
        name: 'Murder Investigation',
        id: 'calls',
        method: 'getCalls',
        hasDates: true,
        hasDynamicID: true,
        staticParams: {},
        filterParams: {},
        filterParams_options: {},
        localFilters: {
          interactions: [],
          duration: [],
          entities: [],
          strictSearch: false,
        },
      },
    ],
    currentWidgets: [
      {
        name: 'timeline',
        title: 'Timeline Representation',
        size: 100,
        filters: {
          annotationsActive: [],
        },
        order: 1,
        datasets: ['calls'],
        config: {
          start: '',
          end: '',
          datasetsInfo: [
            {
              id: 'calls',
              labels: [
                {
                  callees: '',
                },
                {
                  callers: '',
                },
                {
                  'callers -> callees': '',
                },
                {
                  duration: '',
                },
              ],
              legend: [
                {
                  calls: '#ff8f77',
                },
              ],
              groups: [
                {
                  callers: '',
                },
                {
                  callees: '',
                },
              ],
            },
          ],
          data: {
            action: '',
            data: [],
            extra: [],
          },
          id: 'murder',
          clustering: true,
          zoomSync: true,
          doubleClick: true,
          grouping: true,
          colors: {
            text: 'initial',
            gridLines: 'transparent',
            groupsArea: 'initial',
            mainBackground: 'initial',
            topArea: 'initial',
            itemsHighlight: '#f3ba00',
            filterHighlighted: 'blue',
            itemsText: 'black',
          },
          height: '500px',
        },
      },
      {
        name: 'callsDistrib',
        title: 'Calls Distribution',
        size: 100,
        filters: {},
        order: 0,
        datasets: ['calls'],
        config: {
          start: '',
          end: '',
          data: {
            action: '',
            data: [],
            extra: [],
          },
          id: 'murder',
          datasetsInfo: [{ id: 'calls' }],
          xaxisformat: 'dd MMM HH:mm:ss',
          fillColor: '#ec7508',
          brushColor: '#219ebc',
        },
      },
      {
        name: 'network',
        title: 'Network Graph',
        size: 100,
        filters: {},
        order: 2,
        disabled: false,
        datasets: ['calls'],
        config: {
          start: '',
          end: '',
          datasetsInfo: [
            {
              id: 'calls',
              edgeParams: [
                {
                  name: 'Dates',
                  value: 'dates',
                  weightOption: false,
                  dynamic: true,
                },
                {
                  name: 'Duration',
                  value: 'duration',
                  weightOption: true,
                  dynamic: true,
                },
              ],
            },
          ],
          data: {
            action: '',
            data: [],
            extra: [],
          },
          id: 'murder',
          hasDates: {
            enabled: true,
            zoomSync: true,
          },
          height: '500px',
          nodes: {
            size: 20,
            borderWidth: 1,
            color: {
              border: '#3e546d',
              background: 'gray',
              highlight: {
                border: 'black',
                background: '#f3ba00',
              },
              hover: {
                border: 'black',
                background: '#f3ba00',
              },
            },
            font: {
              color: '#152736',
              size: 22,
            },
            filterHighlighted: 'blue',
          },
          edges: {
            font: {
              strokeWidth: 1.5,
              strokeColor: '#3e536d',
              color: '#3e536d',
            },
            color: {
              color: '#ff8f77',
              highlight: '#f3ba00',
              hover: '#1A2750',
            },
          },
        },
      },
    ],
    availableWidgets: [],
  };

export default defaultConfig
  