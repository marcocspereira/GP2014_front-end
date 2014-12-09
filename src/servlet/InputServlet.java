package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import common.Emotion;
import common.Test;

import edu.dei.gp.containers.InsertionResponse;
import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;
import edu.dei.gp.status.InsertionStatus;

/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/InputServlet")
public class InputServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

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
	List<Test> x = new ArrayList<Test>();
	x.add(new Test("#1", 0.5, 0.5, null, null));
	x.add(new Test("#2", 0.2, 0.5, null, null));
	x.add(new Test("#3", -0.8, -1, null, null));
	x.add(new Test("#4", -0.8, 0.4, null, null));
	x.add(new Test("#5", 0.1, 1, null, null));
	x.add(new Test("#6", -0.6, -0.6, null, null));
	x.add(new Test("#7", -0.5, 0.5, null, null));
	x.add(new Test("#7", 0.5, -0.5, null, null));

	Date date = new Date(0);

	List<Emotion> emo = new ArrayList<Emotion>();
	emo.add(new Emotion(0.5, 0.5, 1, 2));
	emo.add(new Emotion(0.2, 0.5, 2, 3));
	emo.add(new Emotion(-0.8, -1, 3, 4));
	emo.add(new Emotion(-0.8, 0.4, 4, 5));
	emo.add(new Emotion(0.1, 1, 5, 6));
	emo.add(new Emotion(-0.6, -0.6, 6, 7));
	emo.add(new Emotion(-0.5, 0.5, 7, 8));
	emo.add(new Emotion(0.5, -0.5, 8, 9));
	emo.add(new Emotion(0.5, 0.5, 9, 10));
	emo.add(new Emotion(0.2, 0.5, 10, 11));
	emo.add(new Emotion(-0.8, -1, 11, 12));
	emo.add(new Emotion(-0.8, 0.4, 12, 13));
	emo.add(new Emotion(0.1, 1, 13, 14));
	emo.add(new Emotion(-0.6, -0.6, 14, 15));
	emo.add(new Emotion(-0.5, 0.5, 15, 16));
	emo.add(new Emotion(0.5, -0.5, 16, 17));
	emo.add(new Emotion(0.5, 0.5, 17, 18));
	/*emo.add(new Emotion( 0.2, 0.5, null, null));
	emo.add(new Emotion( -0.8, -1, null, null));
	emo.add(new Emotion( -0.8, 0.4, null, null));
	emo.add(new Emotion( 0.1, 1, null, null));
	emo.add(new Emotion( -0.6, -0.6, null, null));
	emo.add(new Emotion( -0.5, 0.5, null, null));
	emo.add(new Emotion( 0.5, -0.5, null, null));
	emo.add(new Emotion( 0.5, 0.5, null, null));
	emo.add(new Emotion( 0.2, 0.5, null, null));
	emo.add(new Emotion( -0.8, -1, null, null));
	emo.add(new Emotion( -0.8, 0.4, null, null));
	emo.add(new Emotion( 0.1, 1, null, null));
	emo.add(new Emotion( -0.6, -0.6, null, null));
	emo.add(new Emotion( -0.5, 0.5, null, null));
	emo.add(new Emotion( 0.5, -0.5, null, null));*/


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
		    ArrayList<String> urls = (ArrayList<String>) urlsGson;
		    //ArrayList<InsertionResponse> insertionResponse = frontendBean.processLinks(urls);
		    ArrayList<InsertionResponse> insertionResponse = new ArrayList<InsertionResponse>();
		    for (int z = 0; z < urlsGson.size(); z++) {
			insertionResponse.add(new InsertionResponse(urlsGson.get(z), InsertionStatus.OK));
		    }

		    // Sends response to javascript so it can be displayed on html
		    String json = new Gson().toJson(insertionResponse);
		    out.write(json);

		}
		else if (op.equalsIgnoreCase("importlink")) {
		    // Receives links and sends to FrontEndBean
		    String url = request.getParameter("text");
		    System.out.println(url);
		    //InsertionResponse insertionResponse = frontendBean.processLink(url);
		    InsertionResponse insertionResponse = new InsertionResponse(url, InsertionStatus.OK);

		    // Sends response to javascript so it can be displayed on html
		    String json = new Gson().toJson(insertionResponse);
		    out.write(json);

		}
		// TODO colocar na servlet do plot
		else if (op.equalsIgnoreCase("chartdata")) {

		    System.out.println("Sending data...");
		    String json = new Gson().toJson(x);
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
