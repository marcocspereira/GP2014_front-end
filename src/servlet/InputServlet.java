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
 */
@WebServlet("/InputServlet")
public class InputServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB
    private FrontEndBeanRemote frontendBean;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public InputServlet() {
	super();
	// TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub

		if (!request.getParameterMap().isEmpty())
		{
		    if (request.getParameter("FLAG") != null)
		    {
				String op = request.getParameter("FLAG");
				System.out.println("[SearchServlet] Executing Operation: " + op);
		
				/*RequestDispatcher dispatcher = null;
				HttpSession session = request.getSession(true);*/
				PrintWriter out = response.getWriter();
		
				if (op.equalsIgnoreCase("importfile")) {
				    // Receives links and sends to FrontEndBean
				    List<String> urlsGson = new Gson().fromJson(request.getParameter("text"), List.class);
				    ArrayList<String> urls = new ArrayList<String>();
				    for(String x : urlsGson){
				    	urls.add(x);
				    	//System.out.println(x);
				    }
				    ArrayList<InsertionResponse> insertionResponse = frontendBean.processLinks(urls);
			
				    // Sends response to javascript so it can be displayed on html
				    String json = new Gson().toJson(insertionResponse);
				    out.write(json);
		
				}
				else if (op.equalsIgnoreCase("importlink")) {
				    // Receives links and sends to FrontEndBean
				    String url = request.getParameter("text");
	
				    InsertionResponse insertionResponse = frontendBean.processLink(url);
				    
				    // Sends response to javascript so it can be displayed on html
				    String json = new Gson().toJson(insertionResponse);
				    out.write(json);
		
				}
		    }
		}
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub
    }

}
