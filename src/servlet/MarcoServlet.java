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

/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/MarcoServlet")
public class MarcoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public MarcoServlet() {
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

		if (op.equalsIgnoreCase("textsearch"))
		{
		    // TODO procurar no bean e receber uma catrefada de musicas ou null se nao houver nada q sirva
		    String toSearch = request.getParameter("text");

		    // bean.search(toSearch);

		    List<Song> musicas = new ArrayList<Song>();
		    musicas.add(song);
		    String json = new Gson().toJson(musicas);
		    out.write(json);
		}
		else if (op.equalsIgnoreCase("avsearch")) {

		    int minArousal = Integer.parseInt(request.getParameter("minArousal"));
		    int maxArousal = Integer.parseInt(request.getParameter("maxArousal"));
		    int minValence = Integer.parseInt(request.getParameter("minValence"));
		    int maxValence = Integer.parseInt(request.getParameter("maxValence"));

		    // TODO enviar valores para o bean do backend
		    System.out.println("minArousal: " + minArousal);
		    System.out.println("maxArousal: " + maxArousal);
		    System.out.println("minValence: " + minValence);
		    System.out.println("maxValence: " + maxValence);

		    List<Song> musicas = new ArrayList<Song>();
		    musicas.add(song);
		    String json = new Gson().toJson(musicas);
		    out.write(json);
		}
		else if (op.equalsIgnoreCase("chartdata")) {

		    System.out.println("Sending data...");
		    String json = new Gson().toJson(x);
		    out.write(json);
		}
		else if (op.equalsIgnoreCase("importfile")) {

		    System.out.println("import file");
		    List<String> urls = new Gson().fromJson(request.getParameter("text"), List.class);

		    for (String z : urls) {
			System.out.println(z);
			// TODO bean.importurl(z);
		    }

		    out.write("success");

		}
		else if (op.equalsIgnoreCase("importlink")) {

		    System.out.println("import link");
		    String url = request.getParameter("text");

		    System.out.println("[Single link import]: " + url);
		    String link_feedback = "ta tudo fodido"; // TODO importar do  bean.importurl(url);

		    System.out.println(link_feedback);
		    if (link_feedback.equals("ta tudo fodido")) {
			out.write(url);
		    }
		    else {
			out.write("ok");
		    }
		}
		else if (op.equalsIgnoreCase("getall")) {

		    System.out.println("get all musics");

		    //bean.getAllMusics();

		    //out.write("success");

		}
		else if (op.equalsIgnoreCase("getmusic")) {
		    String art = request.getParameter("artist");
		    String title = request.getParameter("title");
		    System.out.println("get music: " + art + " - " + title);

		    //bean.getMusic(art, title);

		    //out.write("success");

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
