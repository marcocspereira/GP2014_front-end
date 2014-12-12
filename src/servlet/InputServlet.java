package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import edu.dei.gp.containers.InsertionResponse;
import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;

/**
 * Servlet implementation class SearchServlet
 * debug variable should be changed to "true" in order to print debug feedback
 */
@WebServlet("/InputServlet")
public class InputServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final boolean debug = false;

    @EJB
    private FrontEndBeanRemote frontendBean;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public InputServlet() {
	super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     *
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	if (!request.getParameterMap().isEmpty())
	{
	    if (request.getParameter("FLAG") != null)
	    {
		String op = request.getParameter("FLAG");

		String json = null;

		if (debug) {
		    System.out.println("[SearchServlet] Executing Operation: " + op);
		}

		PrintWriter out = response.getWriter();

		/**
		 * IMPORT LINKS FROM A .TXT FILE
		 * receives a list in JSON and converts it to an ArrayList
		 * communicates with frontendBean
		 * for each URL sent, receives feedback
		 * sends the response via JSON to AJAX
		 */
		if (op.equalsIgnoreCase("importfile")) {
		    // Receives links and sends to FrontEndBean
		    List<String> urlsGson = new Gson().fromJson(request.getParameter("text"), List.class);
		    ArrayList<String> urls = new ArrayList<String>();
		    for (String x : urlsGson) {
			urls.add(x);
			if (debug) {
			    System.out.println(x);
			}
		    }
		    ArrayList<InsertionResponse> insertionResponse = frontendBean.processLinks(urls);

		    // Sends response to JavaScript so it can be displayed on HTML
		    json = new Gson().toJson(insertionResponse);

		}
		/**
		 * IMPORT LINKS FROM A SINGLE URL
		 * receives a single URL
		 * communicates with frontendBean
		 * receives feedback
		 * sends the response via JSON to AJAX
		 */
		else if (op.equalsIgnoreCase("importlink")) {
		    // Receives a single link and sends to FrontEndBean
		    String url = request.getParameter("text");
		    InsertionResponse insertionResponse = frontendBean.processLink(url);

		    // Sends response to JavaScript so it can be displayed on HTML
		    json = new Gson().toJson(insertionResponse);

		}

		out.write(json);
	    }
	}
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }

}
