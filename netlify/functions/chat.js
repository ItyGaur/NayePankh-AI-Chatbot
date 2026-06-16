exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini API key not configured" }),
    };
  }

  try {
    const { messages, system } = JSON.parse(event.body);

    // Build conversation history for Gemini
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Try gemini-1.5-flash as fallback (widely available on free tier)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: system || "You are a helpful assistant." }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.7,
        },
      }),
    });

    const data = await response.json();

    // Log full response for debugging (visible in Netlify function logs)
    console.log("Gemini raw response:", JSON.stringify(data));

    // Handle various error cases
    if (data.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error.message || "Gemini API error" }),
      };
    }

    if (!data.candidates || data.candidates.length === 0) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No candidates returned: " + JSON.stringify(data) }),
      };
    }

    const text =
      data.candidates[0]?.content?.parts?.[0]?.text ||
      "I could not generate a response.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
