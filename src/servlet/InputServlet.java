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
import common.Song;
import common.Test;

import edu.dei.gp.containers.InsertionResponse;
import edu.dei.gp.containers.SongLight;
import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;

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

	Song song = new Song("katy puta", "sou porca", "9dgng_ekbV0", "o bacalhau quer alho \n é o melhor tempero!");
	song.setEmotions(emo);

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
		    // receber os links e enviar para o frontendBean
		    List<String> urlsGson = new Gson().fromJson(request.getParameter("text"), List.class);
		    ArrayList<String> urls = (ArrayList<String>) urlsGson;
		    ArrayList<InsertionResponse> insertionResponse = frontendBean.processLinks(urls);

		    // enviar resposta para o javascript tratar de colocar no html
		    String json = new Gson().toJson(insertionResponse);
		    out.write(json);

		}
		else if (op.equalsIgnoreCase("importlink")) {
		    // receber o link e enviar para o frontendBean
		    String url = request.getParameter("text");
		    InsertionResponse insertionResponse = frontendBean.processLink(url);

		    // enviar resposta para o javascript tratar de colocar no html
		    String json = new Gson().toJson(insertionResponse);
		    out.write(json);

		}
		// TODO colocar na SearchServlet
		else if (op.equalsIgnoreCase("textsearch"))
		{
		    // receber o valor textual a procrurar
		    String toSearch = request.getParameter("text");

		    // bean.search(toSearch);
		    ArrayList<SongLight> textSongs = frontendBean.searchAuthorAndTitle(toSearch);

		    // enviar resposta para o javascript tratar de colocar no html
		    String json = new Gson().toJson(textSongs);
		    out.write(json);
		}
		// TODO colocar na SearchServlet
		else if (op.equalsIgnoreCase("avsearch")) {

		    // receber o intervalo de valores para Arousal e Valence
		    float minArousal = Float.parseFloat(request.getParameter("minArousal"));
		    float maxArousal = Float.parseFloat(request.getParameter("maxArousal"));
		    float minValence = Float.parseFloat(request.getParameter("minValence"));
		    float maxValence = Float.parseFloat(request.getParameter("maxValence"));

		    // mandar para o frontendBean
		    ArrayList<SongLight> avSongs = frontendBean.searchArousalAndValenceValues(minArousal, maxArousal,
			    minValence, maxValence);

		    // enviar resposta para o javascript tratar de colocar no html
		    String json = new Gson().toJson(avSongs);
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
