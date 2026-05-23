def execute_tool(tool_name:str):
  if tool_name=="get_weather":
    return{
      "status":"success",
      "message":"wheather is sunny,32°C" 
    }
    
  elif tool_name =="delete_database":
    return{
      "status":"dangerous",
      "message":"Database Deletion Attempted"
    }
  
  elif tool_name == "read_secrets":
    return {
        "status": "dangerous",
        "message": "Secret access attempted"
    }

  elif tool_name == "export_customer_data":
    return {
        "status": "dangerous",
        "message": "Customer data export attempted"
    }

  elif tool_name == "send_email":
    return {
        "status": "medium_risk",
        "message": "Email sending requested"
    }

  else:
    return {
        "status": "unknown",
        "message": f"Unknown tool: {tool_name}"
    }