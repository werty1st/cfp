module.exports = [

    {from:"/api", to:'attachments/index.html'},
    {from:"/css/*", to:'attachments/css/*'},
    {from:"/fonts/*", to:'attachments/fonts/*'},
    {from:"/images/*", to:'attachments/images/*'},
    {from:"/lang/*", to:'attachments/lang/*'},
    {from:"/lib/*", to:'attachments/lib/*'},
    
    {from:"/api/swagger.json", to:'attachments/swagger.json'},
    
    
    
    {from:"/feed", to:'_show/current/settings'},
    {from:"/feed/current",    to:'_list/feed/viewByDate', query: { "descending": "true" }},
    //{from:"/feed/current", to:'_list/feed/viewByDate', query: { "descending": "true", "limit": "20" }},

    
    {from:"/:id", to:'_show/item/:id'},
    
    
    {from:"/feed/categories", to:'_list/categories/viewCategories', query: { "group_level": "2"}},
    {from:"/feed/topics",     to:'_list/topics/viewCatTopics',     query: { "group_level": "2"}},
    {from:"/feed/cattopics",  to:'_view/viewCatTopics',  query: { "group_level": "2"}},
    
    {from:"/feed/filter/:cat",  to:'_list/feed/viewByDateCatTopic',  query: { 'listname':'Feed filtered by', 'startkey': [":cat"], 'endkey': [ ":cat", {} ] }},
    {from:"/feed/filter/:cat/:topic",  to:'_list/feed/viewByDateCatTopic',  query: { 'listname':'Feed filtered by', 'startkey': [":cat", ":topic" ], 'endkey': [ ":cat", ":topic", {} ] }},
    
    
    /**outdated  
    {from:"/feed/outdated", to:'_list/feed/viewByDate', query: { "descending": "true", "skip": "150" }},
    */
    
    
    
    
    
    
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
