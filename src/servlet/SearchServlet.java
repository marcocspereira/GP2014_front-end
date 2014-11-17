package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import common.Test;

/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		List<Test> x = new ArrayList<Test>();
		x.add(new Test("#1",0.5, 0.5, null, null));
		x.add(new Test("#2",0.2, 0.5, null, null));
		x.add(new Test("#3",-0.8, -1, null, null));
		x.add(new Test("#4",-0.8, 0.4, null, null));
		x.add(new Test("#5",0.1, 1, null, null));
		x.add(new Test("#6",-0.6, -0.6, null, null));
		x.add(new Test("#7",-0.5, 0.5, null, null));
		
		if (!request.getParameterMap().isEmpty())
		{
			if (request.getParameter("FLAG") != null)
			{
				String op = request.getParameter("FLAG");
				System.out.println("[SearchServlet] Executing Operation: "+op);
				
				/*RequestDispatcher dispatcher = null;
				HttpSession session = request.getSession(true);*/
				PrintWriter out = response.getWriter();
				
				if (op.equalsIgnoreCase("search_name"))
				{
					String name = request.getParameter("searchname");
					out.write("print disfarçado");
				}
				else if (op.equalsIgnoreCase("chartdata")){
					
					
					String json = new Gson().toJson(x);
					out.write(json);
				}
			}
		}
		
		
		
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
