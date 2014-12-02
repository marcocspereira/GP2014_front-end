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
import common.Emotion;
import common.Song;
import common.Test;

import edu.dei.gp.containers.GenericSongPack;
import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;
import edu.dei.gp.jpa.aux.DominantEmotion;

/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    FrontEndBeanRemote frontendBean;

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

	// TODO retirar esta arraylist q serve de teste a pesquisa de musicas
	List<Song> tempSongs = new ArrayList<Song>();
	tempSongs.add(new Song("Sia", "Chandelier", "-KXPLT2Xk5k", "vai levar na rata", 1, (float) 0.4,
		DominantEmotion.Contentment));

	tempSongs.add(new Song("Katy Perry", "Roar", "9dgng_ekbV0", "berra que nem uma leoa", (float) -0.2, (float) 1.4,
		DominantEmotion.Hapiness));

	tempSongs.add(new Song("Sam Smith", "Stay with", "uTTXJM5woJ8", "fica comigo que tenho frio", 1, (float) -0.4,
		DominantEmotion.Melancholy));

	tempSongs.add(new Song("John Legend", "All Of Me", "Mk7-GRWq7wA", "tudo em mim\nentra em ti\nohohohoh",
		(float) -0.4, (float) 0.4, DominantEmotion.Contentment));

	tempSongs.add(new Song("James Arthur", "Impossible", "1lefGrqcC1A", "impossiveeeeeeel", 1, (float) 0.9,
		DominantEmotion.Anxiety));

	Song song = new Song("Sia", "Chandelier", "-KXPLT2Xk5k", "vai levar na rata", 1, (float) 0.4,
		DominantEmotion.Contentment);
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

		System.out.println(op);

		// TODO colocar na SearchServlet
		if (op.equalsIgnoreCase("textsearch"))
		{
		    // receber o valor textual a procrurar
		    String toSearch = request.getParameter("text");

		    // palavra a procurar e página
		    // TODO descomentar GenericSongPack<SongLight> textSongs = frontendBean.searchAuthorAndTitle(toSearch, 1);

		    // enviar resposta para o javascript tratar de colocar no html
		    // String json = new Gson().toJson(textSongs);
		    // out.write(json);

		    // TODO apagar parte de teste
		    List<Song> teste = new ArrayList<Song>();
		    for (int j = 0; j < tempSongs.size(); j++) {
			if (tempSongs.get(j).getTitle().contains(toSearch)
				|| tempSongs.get(j).getArtist().contains(toSearch)) {
			    teste.add(tempSongs.get(j));
			}
		    }
		    //String json = new Gson().toJson(teste);
		    //out.write(json);

		    if (teste != null) {
			String json = new Gson().toJson(teste);
			out.write(json);
		    }
		    else {
			out.write("null");
		    }
		}
		// TODO colocar na SearchServlet
		else if (op.equalsIgnoreCase("avsearch")) {

		    // receber o intervalo de valores para Arousal e Valence
		    float minArousal = Float.parseFloat(request.getParameter("minArousal"));
		    float maxArousal = Float.parseFloat(request.getParameter("maxArousal"));
		    float minValence = Float.parseFloat(request.getParameter("minValence"));
		    float maxValence = Float.parseFloat(request.getParameter("maxValence"));

		    // mandar para o frontendBean com os valores e a pagina
		    GenericSongPack<Song> avSongs = null; // TODO alterar para: frontendBean.searchArousalAndValenceValues(minArousal, maxArousal, minValence, maxValence, 1);

		    // enviar resposta para o javascript tratar de colocar no html

		    if (avSongs != null) {
			String json = new Gson().toJson(avSongs);
			out.write(json);
		    }
		    else {
			out.write("null");
		    }
		}
		// TODO colocar na PlotServlet
		else if (op.equalsIgnoreCase("chartdata")) {

		    System.out.println("Sending data...");
		    String json = new Gson().toJson(x);
		    out.write(json);
		}
		// TODO devolver todas as musicas sem filtros
		else if (op.equalsIgnoreCase("getall")) {

		    System.out.println("get all musics");

		    //bean.getAllMusics();
		    // Temp
		    String json = new Gson().toJson(tempSongs);
		    out.write(json);

		    //out.write("success");

		}
		// TODO devolver musica atraves de id
		else if (op.equalsIgnoreCase("getmusic")) {
		    String songId = request.getParameter("songId");

		    //bean.getMusic(art, title);
		    //Song theSong = frontendBean.getSongById(Integer.parseInt(songId));

		    String json = new Gson().toJson(song);
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
