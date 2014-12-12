package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import edu.dei.gp.containers.GenericSongPack;
import edu.dei.gp.containers.SongLight;
import edu.dei.gp.containers.SongStatus;
import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;
import edu.dei.gp.jpa.Song;

/**
 * Servlet implementation class SearchServlet
 * debug variable should be changed to "true" in order to print debug feedback
 */
@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final boolean debug = true;

    @EJB
    FrontEndBeanRemote frontendBean;

    public SearchServlet() {
	super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	if (!request.getParameterMap().isEmpty())
	{
	    if (request.getParameter("FLAG") != null)
	    {
		String op = request.getParameter("FLAG");

		if (debug) {
		    System.out.println("[SearchServlet] Executing Operation: " + op);
		}

		PrintWriter out = response.getWriter();

		/**
		 * SEARCH MUSICS BY TEXT COMPARATION
		 * receives the page that should be requested from back-end (>=1)
		 * receives a text value from AJAX
		 * communicates with frontendBean
		 * receives a pack with an ArrayList of Songs, numberOfPages and currentPage
		 * sends the response via JSON to AJAX
		 */
		if (op.equalsIgnoreCase("textsearch"))
		{
		    // Receives page and text values to search for
		    int page = Integer.parseInt(request.getParameter("page"));
		    String toSearch = request.getParameter("text");

		    if (debug) {
			System.out.println("[SearchServlet] pesquisa pelo texto: " + toSearch);
		    }

		    // communicates with back-end
		    GenericSongPack<SongLight> textSongs = frontendBean.searchAuthorAndTitle(toSearch, page);
		    // processing back-end response in order to send to AJAX
		    if (textSongs != null) {
			String json = new Gson().toJson(textSongs);
			out.write(json);
		    }
		    else {
			out.write("null");
		    }
		}
		/**
		 * SEARCH MUSICS BY AROUSAL AND VALENCE VALUES
		 * receives 4 values: MIN and MAX to Arousal and Valence
		 * receives which page to search for
		 * communicates with frontendBean
		 * receives a pack with an ArrayList of Songs, numberOfPages and currentPage
		 * sends the response via JSON to AJAX
		 */
		else if (op.equalsIgnoreCase("avsearch"))
		{
		    // Receives page and value interval for Arousal and Valence
		    int page = Integer.parseInt(request.getParameter("page"));
		    float minArousal = Float.parseFloat(request.getParameter("minArousal"));
		    float maxArousal = Float.parseFloat(request.getParameter("maxArousal"));
		    float minValence = Float.parseFloat(request.getParameter("minValence"));
		    float maxValence = Float.parseFloat(request.getParameter("maxValence"));

		    // Sends to frontendBean with values and page to search for
		    GenericSongPack<SongLight> avSongs = frontendBean.searchArousalAndValenceValues(minArousal, maxArousal,
			    minValence, maxValence, page);

		    // processing back-end response in order to send to AJAX
		    if (avSongs != null) {
			String json = new Gson().toJson(avSongs);
			out.write(json);
		    }
		    else {
			out.write("null");
		    }
		}
		/**
		 * REQUIRES FEEDBACK OF EVERY MUSIC IN PROCESSING PHASE
		 * receives which page of feedbacks to show
		 * communicates with frontendBean
		 * receives a pack with an ArrayList of Feedbacks, numberOfPages and currentPage
		 * sends the response via JSON to AJAX
		 */
		else if (op.equalsIgnoreCase("getfeedback"))
		{
		    int page = Integer.parseInt(request.getParameter("page"));
		    GenericSongPack<SongStatus> songStatus = frontendBean.getSongsStatus(page);

		    // processing back-end response in order to send to AJAX
		    if (songStatus != null && songStatus.getListContents().size() > 0) {
			if (debug) {
			    System.out.println("[SEARCHServlet] maxPages: " + songStatus.getNumberOfPages());
			    System.out.println(songStatus.getListContents().get(0).getLyricsStatus().toString());
			}
			//List<SongStatus> songsList = songStatus.getListContents();
			String json = new Gson().toJson(songStatus);
			out.write(json);
		    }
		    else {
			out.write("null");
		    }

		}
		/**
		 * REQUIRES ALL MUSICS IN THE SYSTEMS
		 * receives which page to show
		 * communicates with frontendBean
		 * receives a pack with an ArrayList of Songs, numberOfPages and currentPage
		 * sends the response via JSON to AJAX
		 */
		else if (op.equalsIgnoreCase("getall"))
		{
		    // Receives page and communicates with back-end
		    int page = Integer.parseInt(request.getParameter("page"));
		    GenericSongPack<SongLight> songs = frontendBean.getReadyLighSongs(page);

		    // processing back-end response in order to send to AJAX
		    String json = new Gson().toJson(songs);
		    out.write(json);
		}
		/**
		 * REQUIRES A SPECIFIC MUSIC BY ID
		 * receives the id to get information
		 * communicates with frontendBean
		 * receives a Song
		 * sends the response via JSON to AJAX
		 */
		else if (op.equalsIgnoreCase("getmusic"))
		{
		    // Receives page
		    String songId = request.getParameter("songId");

		    if (debug) {
			System.out.println("[SEARCHServlet] Id to get information: " + songId);
		    }

		    // Communicates with back-end
		    Song theSong = frontendBean.getSongById(Integer.parseInt(songId));

		    // processing back-end response in order to send to AJAX
		    String json = new Gson().toJson(theSong);
		    out.write(json);
		}
		/**
		 * EDIT TEXT LYRIC
		 * NOT IMPLEMENTED
		 * receives SongID and the lyric to replace
		 */
		else if (op.equalsIgnoreCase("editLyric")) {
		    /*
		    String songId = request.getParameter("songId");
		    String text = request.getParameter("text");
		     */
		}
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
