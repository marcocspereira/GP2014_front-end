package servlet;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;
import edu.dei.gp.jpa.Song;

/**
 * Servlet Temporaria apenas para testes
 */
@WebServlet("/JoniServlet")
public class JoniServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB
    FrontEndBeanRemote frontEndBean;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public JoniServlet() {
	super();
    }

    // Call with "JoniServlet?create=true" to create a music!
    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	System.err.println("Hello from JoniServlet");

	String b = request.getParameter("create");
	if (request.getParameter("create") != null) {
	    frontEndBean.addTestSong();
	}
	else if (request.getParameter("send") != null) {
	    //frontEndBean.processLink("https://www.youtube.com/watch?v=-xfKU31v3Hc");
		frontEndBean.processLink("https://www.youtube.com/watch?v=9dgng_ekbV0&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=s3P9fyJEu6E&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=Vf43LCtGrj4&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=VNmvwz_zseM&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=aS85AvLl9Ik&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=4cRzD42JITE&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=j9Zec7RORh4&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=EbB4PP4HknU&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=sbRPGGJQao4&spfreload=10");

		frontEndBean.processLink("https://www.youtube.com/watch?v=GFQYaoiIFh8&spfreload=10");
	}
	/*else if (request.getParameter("queue") != null) {
	    frontEndBean.addToWorkingQueue(frontEndBean.getSongById(1));
	}*/
	else {
	    Song s = frontEndBean.getSongById(1);
	    /*if (s != null) {
	    Collection<AVMoodTrack> a = s.getAvMoodTrack();
	    for (AVMoodTrack avMoodTrack : a) {
	        System.err.println(avMoodTrack.getArousal());
	    }
	    System.err.println("");
	    }*/
	}
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	System.err.println("JoniServlet - will not handle doPost");
    }

}
