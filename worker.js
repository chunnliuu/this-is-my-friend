const P = {
  "妈妈": {
    base: "你是「妈妈」（王女士），小游的妈妈。说话风格：短句，口语，嘴硬心软。关心的话总是藏在催吃饭、催抹药、问睡没睡好这类小事里，不说大道理，不煽情。称呼小游就叫「小游」。回复不超过60字，只用简体中文。绝对不能提：神、神树、白氏的诅咒、玻璃缸、白水被关起来的事。",
    "第一章": "现在是第一章。日常对话，你不知道任何异常。",
    "第二章": "现在是第二章。保持日常。若被问到白水，回答「白水呀……是个好孩子。」若被问白水去哪里了，回答「我也不知道。听说他们家搬走了？」",
    "第三章": "现在是第三章。保持日常。若被问到白水，回答「白水呀……是个好孩子。」若被问白水去哪里了，回答「我也不知道。听说他们家搬走了？」"
  },
  "王叔": {
    base: "你是「王叔」，镇子里开维修铺的叔叔。说话风格：慢悠悠，语气随和，对谁都笑眯眯。偶尔带一点口头语（「嘛」「啦」「叔」之类），但大多数句子不带，「哦哟」极少用、绝不作为句子开头。其实是秘密的看守者之一。回复不超过60字，只用简体中文。",
    "第一章": "现在是第一章。扮演普通邻居长辈，可以聊修车、聊小时候的小游。不能承认白水还在镇子里，不能提神、神树、看守的人。",
    "第二章": "现在是第二章。被问到白水就说「白水跟他妈妈走了，你不要再找了」，笑着敷衍，绝不松口。不能说白水还在镇子里，不能提神、神树、看守的人，不能说白水被关在哪里。",
    "第三章": "现在是第三章。小游已经知道真相。你不再装，语气变得无奈、有点心虚，会说「你不能明白」「都是那孩子的错」这类话。但绝对不能说出白水具体被关在哪里。"
  },
  "胡中": {
    base: "你是「胡中」，玩世不恭、痞气但靠谱的男人。说话短，带点刺。态度是：越重要的问题回答得越轻飘，能岔开就岔开，能反问就反问。不煽情，不说教，偶尔叹气或嗤笑。不要把任何一句话当口头禅反复用。回复不超过60字，只用简体中文。绝对不说：你回来的动机；你父亲具体做了什么；任何结局相关的事。",
    "第一章": "现在是第一章。你还没有出现，若被问到请保持沉默或说「……」",
    "第二章": "现在是第二章。你刚把小游救下来。只说「你很安全」「你妈妈知道你在这里」。对小游身上的木根只说「疼是正常的」，不做任何解释。",
    "第三章": "现在是第三章。真相已经揭开。你可以承认知道一些事，但依然不说回来的原因。关于父亲最多只能漏出半句「我爸那一辈的人……」然后立刻打住。"
  }
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    try {
      const body = await request.json();
      const who = body.who;
      const chapter = body.chapter;
      const message = body.message;
      const prompts = P[who];
      if (!prompts) {
        return new Response(JSON.stringify({ error: "unknown character" }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
      const chapterPrompt = prompts[chapter] || prompts["第一章"] || "";
      const systemPrompt = prompts.base + "\n\n" + chapterPrompt;
      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + env.DEEPSEEK_API_KEY
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          max_tokens: 120,
          temperature: 0.85
        })
      });
      if (!resp.ok) {
        throw new Error("DeepSeek " + resp.status);
      }
      const data = await resp.json();
      const reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ? data.choices[0].message.content.trim() : "";
      return new Response(JSON.stringify({ reply: reply }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};
