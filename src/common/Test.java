package common;

import java.io.Serializable;
import java.util.Date;

public class Test implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String music;
	private double arousal;
	private double valence;
	private Date t1;
	private Date t2;
	
	
	public Test(String music, double arousal, double valence, Date t1, Date t2) {
		super();
		this.music = music;
		this.arousal = arousal;
		this.valence = valence;
		this.t1 = t1;
		this.t2 = t2;
	}
	public String getMusic() {
		return music;
	}
	public void setMusic(String music) {
		this.music = music;
	}
	public double getArousal() {
		return arousal;
	}
	public void setArousal(double arousal) {
		this.arousal = arousal;
	}
	public double getValence() {
		return valence;
	}
	public void setValence(double valence) {
		this.valence = valence;
	}
	public Date getT1() {
		return t1;
	}
	public void setT1(Date t1) {
		this.t1 = t1;
	}
	public Date getT2() {
		return t2;
	}
	public void setT2(Date t2) {
		this.t2 = t2;
	}
	
	
}
