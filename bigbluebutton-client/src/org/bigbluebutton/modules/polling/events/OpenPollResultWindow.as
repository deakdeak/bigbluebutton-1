package org.bigbluebutton.modules.polling.events
{
  import flash.events.Event;
  
  public class OpenPollResultWindow extends Event
  {
    public static const OPEN_RESULT_WINDOW:String = "open poll result window";
    
    private var _pollID:String;
    
    public function OpenPollResultWindow(pollID:String)
    {
      super(OPEN_RESULT_WINDOW, true, false);
      
      _pollID = pollID;
    }
    
    public function get pollID():String {
      return _pollID;
    }
  }
}