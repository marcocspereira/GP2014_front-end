package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import common.Emotion;
import common.SongTest;
import common.Test;

import edu.dei.gp.containers.GenericSongPack;
import edu.dei.gp.containers.SongLight;
import edu.dei.gp.containers.SongStatus;
import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;
import edu.dei.gp.jpa.AVMoodTrack;
import edu.dei.gp.jpa.Artist;
import edu.dei.gp.jpa.Song;
import edu.dei.gp.jpa.auxiliary.DominantEmotion;


/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB
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

	/*List<Song> tempSongs = new ArrayList<Song>();
	tempSongs.add(new Song(0, "Sia", "Chandelier", "-KXPLT2Xk5k", "Lalalalala", 1, (float) 0.4,
	tempSongs.get(tempSongs.size() - 1).setEmotions(emo);

	tempSongs.add(new SongTest(1, "Katy Perry", "Roar", "9dgng_ekbV0", "berra que nem uma leoa", (float) -0.2, (float) 1.4,

	tempSongs
	.add(new Song(
		1,
		"Katy Perry",
		"Roar",
		"9dgng_ekbV0",
		"Come up to meet you, Tell you I'm sorry, You don't know how lovely you are. I had to find you, Tell you I need you, Tell you I set you apart. Tell me your secrets, And ask me your questions, Oh let's go back to the start. Runnin' in circles, Comin' up tails, Heads on a science apart. Nobody said it was easy, It's such a shame for us to part. Nobody said it was easy, No one ever said it would be this hard. Oh take me back to the start. I was just guessin', At numbers and figures, Pullin' the puzzles apart. Questions of science, Science and progress, Do not speak as loud as my heart. Tell me you love me, Come back and haunt me, Oh, what a rush to the start. Runnin' in circles, Chasin' our tails, Comin' back as we are. Nobody said it was easy, Oh it's such a shame for us to part. Nobody said it was easy, No one ever said it would be so hard. I'm goin' back to the start. Oh ooh ooh ooh ooh ohh, Ah ooh ooh ooh ooh ooh, Oh ooh ooh ooh ooh ohh, Oh ooh ooh ooh ooh ohh.",
		(float) -0.2, (float) 1.4,
	>>>>>>> branch 'master' of https://github.com/macsp/GP2014_front-end.git
		DominantEmotion.Hapiness, (float) 0.4));
	tempSongs.get(tempSongs.size() - 1).setEmotions(emo);
	tempSongs.add(new SongTest(2, "Sam Smith", "Stay with", "uTTXJM5woJ8", "fica comigo que tenho frio", 1, (float) -0.4,
		DominantEmotion.Melancholy, (float) 0.5));
	tempSongs.get(tempSongs.size() - 1).setEmotions(emo);
	<<<<<<< HEAD
	tempSongs.add(new SongTest(3, "John Legend", "All Of Me", "Mk7-GRWq7wA", "tudo em mim\nentra em ti\nohohohoh",
	=======
	tempSongs.add(new Song(3, "John Legend", "All Of Me", "Mk7-GRWq7wA", "tudo em mim\nBLABLABLA\nohohohoh",
	>>>>>>> branch 'master' of https://github.com/macsp/GP2014_front-end.git
		(float) -0.4, (float) 0.4, DominantEmotion.Contentment, (float) 0.6));
	tempSongs.get(tempSongs.size() - 1).setEmotions(emo);
	tempSongs.add(new SongTest(4, "James Arthur", "Impossible", "1lefGrqcC1A", "impossiveeeeeeel", 1, (float) 0.9,
		DominantEmotion.Anxiety, (float) 0.7));
	tempSongs.get(tempSongs.size() - 1).setEmotions(emo);*/
	/*Song song = new Song("Sia", "Chandelier", "-KXPLT2Xk5k", "vai levar na rata", 1, (float) 0.4,
		DominantEmotion.Contentment, (float) 0.3);*/
	//song.setEmotions(emo);


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
		    // Receives text value to search for
		    String toSearch = request.getParameter("text");
		    boolean check = false;
		    // Word to search and page
		    // TODO descomentar GenericSongPack<SongLight> textSongs = frontendBean.searchAuthorAndTitle(toSearch, 1);

		    // Sends response to javascript so it can be displayed on html
		    // String json = new Gson().toJson(textSongs);
		    // out.write(json);

		    // TODO apagar parte de teste
		    List<SongTest> teste = new ArrayList<SongTest>();
		    /*for (int j = 0; j < tempSongs.size(); j++) {
		    	if (tempSongs.get(j).getTitle().contains(toSearch)
		    		|| tempSongs.get(j).getArtist().contains(toSearch)) {
		    	    check = true;
		    	    teste.add(tempSongs.get(j));
		    	}
		    }*/
		    //String json = new Gson().toJson(teste);
		    //out.write(json);

		    if (check) {
			String json = new Gson().toJson(teste);
			out.write(json);
		    }
		    else {
			out.write("null");
		    }
		}
		// TODO colocar na SearchServlet
		else if (op.equalsIgnoreCase("avsearch")) {

		    // Receives value interval for Arousal and Valence
		    float minArousal = Float.parseFloat(request.getParameter("minArousal"));
		    float maxArousal = Float.parseFloat(request.getParameter("maxArousal"));
		    float minValence = Float.parseFloat(request.getParameter("minValence"));
		    float maxValence = Float.parseFloat(request.getParameter("maxValence"));

		    // Sends to FrontEndBean with values and page
		    GenericSongPack<SongLight> avSongs = null; // TODO alterar para: frontendBean.searchArousalAndValenceValues(minArousal, maxArousal, minValence, maxValence, 1);

		    // Sends response to javascript so it can be displayed on html

		    if (avSongs != null) {
			String json = new Gson().toJson(avSongs);
			out.write(json);
		    }
		    else {
			out.write("null");
		    }
		}
		// feedback das musicas q estao em analise no sistema
		else if (op.equalsIgnoreCase("getfeedback")) {
		    // GenericSongPack<SongStatus> songStatus = frontendBean.getSongsStatus(1);

		    ArrayList<SongStatus> singthesong = new ArrayList<SongStatus>();
		    AVMoodTrack lolo = new AVMoodTrack(1, 1, 1, 1);
		    Collection<AVMoodTrack> caral = new ArrayList<AVMoodTrack>();
		    caral.add(lolo);
		    Artist artist = new Artist("chief of them");
		    edu.dei.gp.jpa.Song s = new edu.dei.gp.jpa.Song("does not push", "4b95MCszOxY", "xupa.txt",
			    "sim eu sei", 1, "c:\\ficheiro.png", artist, caral, 1, 1, DominantEmotion.Anxiety);
		    SongStatus ss = new SongStatus(s);
		    singthesong.add(ss);
		    GenericSongPack<SongStatus> songStatus = new GenericSongPack<SongStatus>(singthesong, 1, 1);
		    List<SongStatus> vaginasio = new ArrayList<SongStatus>();
		    vaginasio.add(ss);
		    if (songStatus != null) {
			String json = new Gson().toJson(vaginasio);
			out.write(json);
		    }

		}
		// TODO colocar na PlotServlet
		else if (op.equalsIgnoreCase("chartdata")) {

		    System.out.println("Sending data...");
		    String json = new Gson().toJson(x);
		    out.write(json);
		}
		// TODO Returns all musics unfiltered
		else if (op.equalsIgnoreCase("getall")) {

		    System.out.println("get all musics");

		    GenericSongPack<SongLight> songs = frontendBean.getReadyLighSongs(1);
		    //bean.getAllMusics();


		    List<SongLight> songsList = songs.getListContents();

		    String json = new Gson().toJson(songsList);
		    out.write(json);

		    //out.write("success");

		}
		// TODO Returns music through it's id
		else if (op.equalsIgnoreCase("getmusic")) {
		    String songId = request.getParameter("songId");
		    //bean.getMusic(art, title);
		    Song theSong = frontendBean.getSongById(Integer.parseInt(songId));
		    // Song match = null;

		    /*for (int j = 0; j < tempSongs.size(); j++) {
		    //System.out.println(tempSongs.get(j).getSongId());
		    	if (tempSongs.get(j).getSongId() == Integer.parseInt(songId)) {
		    	    match = tempSongs.get(j);

		    	    break;
		    	}
		    }*/
		    //String json = new Gson().toJson(teste);
		    //out.write(json);

		    //System.out.println("tentativa de load de AVMoodTrack");
		    Collection<AVMoodTrack> av = theSong.getAvMoodTrack();
		    /* List<AVMoodTrack> listav = new ArrayList<AVMoodTrack>();
		     System.out.println(av);*/
		    System.out.println("ANTES DO JSON col");


		    //listav.add(avm);


		    String json = new Gson().toJson(av);
		    System.out.println("DEPOIS DO JSON");
		    out.write(json);

		}
		else if (op.equalsIgnoreCase("editLyric")) {
		    String songId = request.getParameter("songId");
		    String text = request.getParameter("text");

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
