module.exports = [
    {from:"/api", to:'../../'},
    {from:"/api/*", to:'../../*'},
    
    
    
    {from:"/feed", to:'_show/feed/settings'},
    
    
    
    
    
    
    {from:"/today", to:'_list/list_getToday/view_getAllByDate'},

    {from:"/now/:station", to:'_list/list_getNow/by_SubType',     query: { "station": ':station', "days": "0" }},
    //{from:"/today/:station", to:'_list/list_getToday/view_getAllByDate', query: { "station": ':station', "days": "0" }},
    {from:"/today/:station", to:'_list/list_getToday/view_getAllByStation', query: { startkey: ":station", endkey: ":station", "station": ':station', "days": "0" }},
    
    
    {from:"/today/add/:days/",         to:'_list/list_getToday/view_getAllByDate', query: { station: 'all',      days: ':days' }},    
    {from:"/today/add/:days/:station", to:'_list/list_getToday/view_getAllByDate', query: { station: ':station', days: ':days' }},    
    
    /*sportart
    {from:"/today/add/:days/:sportart", to:'_list/list_getToday/view_getAllByDate', query: { station: ':station', days: ':days' }},
    {from:"/now/:sportart", to:'_list/list_getNow/view_getAllByDate',     query: { "station": ':station', "days": "0" }},
    {from:"/today/:sportart", to:'_list/list_getToday/view_getAllByStation', query: { startkey: ":station", endkey: ":station", "station": ':station', "days": "0" }},    
    */
    
    {from:"/now/:station/:vcmsid", to:'_show/show_getByID/:vcmsid' },
    {from:"/today/:station/:vcmsid", to:'_show/show_getByID/:vcmsid' },
    {from:"/byId/:vcmsid", to:'_show/show_getByID/:vcmsid' },
    {from:"/*", to:'*'}
];
