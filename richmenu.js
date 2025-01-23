const line = require('@line/bot-sdk');
const { join } = require("node:path");
const { readFileSync } = require("node:fs");
require('dotenv').config();

const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.CHANNEL_TOKEN,
  });
const blobClient = new line.messagingApi.MessagingApiBlobClient({
    channelAccessToken: process.env.CHANNEL_TOKEN,
  });



const home = () => ({
  size : {
    width: 2500,
    height: 1686
  },
  selected: false,
  name: "richmenu-home",
  chatBarText: "See Menu",
  areas: [
    {
      bounds : {
        x: 0,
        y: 0,
        width: 869.6,
        height: 1133.6
      },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-alias-logpersonal",
          data: "richmenu-changed-to-logpersonal"

        }
    },
    {
      bounds: {
        x: 869.6,
        y: 0,
        width: 766.9,
        height: 566.8
        },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-alias-logmultiple",
          data: "richmenu-changed-to-logpmultiple"

        }

    },

    {bounds: {
      x: 869.6,
      y: 566.8,
      width: 766.9,
      height: 566.8
      },
      action: {
        type: "richmenuswitch",
        richMenuAliasId: "richmenu-alias-logfam",
        data: "richmenu-changed-to-logfam"

      }

    },

    {bounds : {
        x: 1636.5,
        y: 0,
        width: 863.5,
        height: 1133.6
      },
      action : {
        type: "richmenuswitch",
        richMenuAliasId: "richmenu-alias-summarypersonal",
        data: "richmenu-changed-to-summmarypersonal"
  
      }


    },
    {
      bounds: {
        x: 0,
        y: 1133.6,
        width: 2500,
        height: 552.4
      },
      action: {
        type: "postback",
        data: "action=summary"
      }

    }
  ]
})

// categ, amount
const logPersonal = () => ({
  size : {
    width: 2500,
    height: 1686
  },
  selected: false,
  name: "richmenu-logpersonal",

  chatBarText: "See Category",
  areas: [
    {
      bounds : {
        x: 0,
        y: 1133.6,
        width: 2500,
        height: 552.4
      },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-alias-home",
          data: "richmenu-switched"

        }
    },

    {
      bounds : {
       x: 0,
       y:0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Category: Meal\nAmount: "
      }
    },
    {
      bounds : {
       x: 0,
       y:566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Category: Phone\nAmount: "
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Category: Transportation\nAmount: "
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Category: Supermarket\nAmount: "
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Category: Med\nAmount: "
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Category (please fill): \nAmount: "
      }
    }
  
  ]
})

// categ, ppl, amount
const logMultiple = () => ({
  size : {
    width: 2500,
    height: 1686
  },
  selected: false,
  name: "richmenu-logmultiple",


  chatBarText: "See Category",
  areas: [
    {
      bounds : {
        x: 0,
        y: 1133.6,
        width: 2500,
        height: 552.4
      },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-alias-home",
          data: "richmenu-switched"

        }
    },

    {
      bounds : {
       x: 0,
       y:0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-mutilple",
        inputOption: "openKeyboard",
        fillInText: "Category: Meal\nPeople (fill with others' LINE names): You,\nAmount: "
      }
    },
    {
      bounds : {
       x: 0,
       y:566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-mutilple",
        inputOption: "openKeyboard",
        fillInText: "Category: Phone\nPeople (fill with others' LINE names): You,\nAmount: "
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-mutilple",
        inputOption: "openKeyboard",
        fillInText: "Category: Transportation\nPeople (fill with others' LINE names): You,\nAmount: "
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-mutilple",
        inputOption: "openKeyboard",
        fillInText: "Category: Supermarket\nAmount: \nPeople (fill with others' LINE names): You,"
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-mutilple",
        inputOption: "openKeyboard",
        fillInText: "Category: Med\nPeople (fill with others' LINE names): You,\nAmount: "
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-mutilple",
        inputOption: "openKeyboard",
        fillInText: "Category (please fill): \nPeople (fill with others' LINE names): You,\nAmount: "
      }
    }
  
  ]
 
})


// categ, ppl, amount
const logFam = () => ({
  size : {
    width: 2500,
    height: 1686
  },
  selected: false,
  name: "richmenu-logfam",


  chatBarText: "See Category",
  areas: [
    {
      bounds : {
        x: 0,
        y: 1133.6,
        width: 2500,
        height: 552.4
      },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-alias-home",
          data: "richmenu-switched"

        }
    },

    {
      bounds : {
       x: 0,
       y:0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-fam",
        inputOption: "openKeyboard",
        fillInText: "Category: Meal\nPeople: Family\nAmount: "
      }
    },
    {
      bounds : {
       x: 0,
       y:566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-fam",
        inputOption: "openKeyboard",
        fillInText: "Category: Phone\nPeople: Family\nAmount: "
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-fam",
        inputOption: "openKeyboard",
        fillInText: "Category: Transportation\nPeople: Family\nAmount: "
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-fam",
        inputOption: "openKeyboard",
        fillInText: "Category: Supermarket\nPeople: Family\nAmount: "
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-fam",
        inputOption: "openKeyboard",
        fillInText: "Category: Med\nPeople: Family\nAmount: "
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-fam",
        inputOption: "openKeyboard",
        fillInText: "Category (please fill): \nPeople: Family\nAmount: "
      }
    }
  
  ]



})

// categ
const summaryPersonal = () => ({
  size : {
    width: 2500,
    height: 1686
  },
  selected: false,
  name: "richmenu-summarypersonal",
  

  chatBarText: "See Category",
  areas: [
    {
      bounds : {
        x: 0,
        y: 1133.6,
        width: 2500,
        height: 552.4
      },
        action: {
          type: "richmenuswitch",
          richMenuAliasId: "richmenu-alias-home",
          data: "richmenu-switched"

        }
    },

    {
      bounds : {
       x: 0,
       y:0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Summarized Category: Meal"
      }
    },
    {
      bounds : {
       x: 0,
       y:566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Summarized Category: Phone"
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Summarized Category: Transportation"
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 0,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Summarized Category: Supermarket"
      }
    },
    {
      bounds : {
       x: 833.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Summarized Category: Med"
      }
    },
    {
      bounds : {
       x: 1666.5,
       y: 566.8,
       width: 833,
       height: 566.8
      }, 
      action : {
        type: "postback",
        data: "log-personal",
        inputOption: "openKeyboard",
        fillInText: "Summarized Category (please fill): "
      }
    }
  
  ]

})




const createHome = async (client, blobClient) => {
  const homeId = (await client.createRichMenu(
    home()
  )).richMenuId;

  const filePathHome = join(__dirname, "./public/home.png")
  const bufferHome = readFileSync(filePathHome)

  await blobClient.setRichMenuImage(homeId, 
    new Blob([bufferHome], {type: "image/png"}))

  await client.setDefaultRichMenu(homeId)
  await client.createRichMenuAlias({
    richMenuId: homeId,
    richMenuAliasId: 'richmenu-alias-home'
  })

}

const createOthers = async (client, blobClient) => {
  const filePath = join(__dirname, "./public/second.png")
  const buffer = readFileSync(filePath)
  const blob = new Blob([buffer], {type: "image/png"})
  const menuDict = {'logpersonal':logPersonal(),
                        'logfam': logFam()
                        , 'summarypersonal': summaryPersonal(), 
                        'logmultiple': logMultiple()}

  for (var alias in menuDict) {
    let id = (await client.createRichMenu(menuDict[alias])).richMenuId;
    await blobClient.setRichMenuImage(
      id, blob
    );

    await client.createRichMenuAlias({
      richMenuId: id,
      richMenuAliasId: `richmenu-alias-${alias}`
    })

  }

}


const deleteAll = async () => {
  try {
    const aliases = (await client.getRichMenuAliasList()).aliases

    for (a of aliases) {
      let aliasId = a.richMenuAliasId
      let id = a.richMenuId

      await client.deleteRichMenu(id)
      await client.deleteRichMenuAlias(aliasId)
    }

  } catch (err) {
    console.error(err)
  }

}

const showAll = async () => {
  const aliases = (await client.getRichMenuAliasList()).aliases
  console.log(aliases)

  const richMenus = (await  client.getRichMenuList()).richmenus
  console.log(richMenus)
}

// deleteAll()
// showAll()


// createHome(client, blobClient)
// createOthers(client,blobClient)