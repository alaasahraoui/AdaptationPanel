const adaptations=
[
    {
        actionId:0,
        strategies:[2],
        actionName: "Remove Graph",
        actionDescription: "Hide the graph and place it in the available widgets section",
        adapt: function(currentConfig, params) {
            const index = currentConfig.currentWidgets.findIndex(widget => widget.name === 'network');

            if (index > -1) {
                const [widget] = currentConfig.currentWidgets.splice(index, 1);
                currentConfig.availableWidgets.push(widget);
            }

            return currentConfig
        }
    },
    {
        actionId:1,
        strategies:[2],
        actionName: "Remove Timeline",
        actionDescription: "Hide the timeline and place it in the available widgets section",
        adapt: function(currentConfig, params) {
            const index = currentConfig.currentWidgets.findIndex(widget => widget.name === 'timeline');

            if (index > -1) {
                const [widget] = currentConfig.currentWidgets.splice(index, 1);
                currentConfig.availableWidgets.push(widget);
            }

            return currentConfig
        }
    },
    {
        actionId:2,
        strategies:[0],
        actionName: "Filter interaction",
        actionDescription: "description",
        adapt: function(currentConfig, params) {
            const minInteraction = params['min'] || 2
            const maxInteraction = params['max'] || 5
            currentConfig.datasets[0].localFilters.interactions = [minInteraction, maxInteraction]
            return currentConfig
        }
    },
    {
        actionId:3,
        strategies:[0],
        actionName: "Change Date Format",
        actionDescription: "description",
        adapt: function(currentConfig, params) {
            const index = currentConfig.currentWidgets.findIndex(widget => widget.name === 'callsDistrib');
            const dateFormat = params['format'] || "HH:mm"
            if (index > -1) {
                currentConfig.currentWidgets[index].config.xaxisformat = params["format"]
            }
            return currentConfig
        }
    },
    {
        actionId:4,
        strategies:[1],
        actionName: "Inverse Timeline and Network order",
        actionDescription: "description",
        adapt: function(currentConfig, params) {
            const indexTimeline = currentConfig.currentWidgets.findIndex(widget => widget.name === 'timeline');
            const indexNetwork = currentConfig.currentWidgets.findIndex(widget => widget.name === 'network');
            
            if (indexTimeline > -1 && indexNetwork > -1) {
                const orderTimeline = currentConfig.currentWidgets[indexTimeline].order
                currentConfig.currentWidgets[indexTimeline].order = currentConfig.currentWidgets[indexNetwork].order
                currentConfig.currentWidgets[indexNetwork].order = orderTimeline
            }
            return currentConfig
        }
    },
    {
        actionId:5,
        strategies:[0,1,2],
        actionName: "adaptation 1",
        actionDescription: "description",
        adapt: function(currentConfig, params) {
        
            return currentConfig
        }
    },
    {
        actionId:6,
        strategies:[0,1,2],
        actionName: "adaptation 2",
        actionDescription: "description",
        adapt: function(currentConfig, params) {
            return currentConfig;
        }
    },
  ];
  export default adaptations;
  